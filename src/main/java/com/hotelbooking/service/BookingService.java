package com.hotelbooking.service;

import com.hotelbooking.dto.BookedRoomDTO;
import com.hotelbooking.dto.BookingDTO;
import com.hotelbooking.dto.BookingRequest;
import com.hotelbooking.entity.*;
import com.hotelbooking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final BookingRoomRepository bookingRoomRepository;
    
    public BookingDTO createBooking(BookingRequest request) {
        // Validate user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Validate hotel
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        
        // Validate rooms
        List<Room> rooms = roomRepository.findAllById(request.getRoomIds());
        if (rooms.size() != request.getRoomIds().size()) {
            throw new RuntimeException("Some rooms not found");
        }
        
        // Check room availability
        for (Room room : rooms) {
            if (!room.getIsAvailable()) {
                throw new RuntimeException("Room " + room.getRoomNumber() + " is not available");
            }
        }
        
        // Calculate nights
        long nights = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (nights <= 0) {
            throw new RuntimeException("Invalid date range");
        }
        
        // Calculate total amount
        BigDecimal totalAmount = rooms.stream()
                .map(Room::getPricePerNight)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .multiply(BigDecimal.valueOf(nights));
        
        // Generate booking reference
        String bookingReference = generateBookingReference();
        
        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setHotel(hotel);
        booking.setBookingReference(bookingReference);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setTotalNights((int) nights);
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus("CONFIRMED");
        booking.setPaymentStatus("PAID");
        booking.setSpecialRequests(request.getSpecialRequests());
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Create booking rooms
        for (Room room : rooms) {
            BookingRoom bookingRoom = new BookingRoom();
            bookingRoom.setBooking(savedBooking);
            bookingRoom.setRoom(room);
            bookingRoom.setRoomPrice(room.getPricePerNight());
            bookingRoomRepository.save(bookingRoom);
            
            // Mark room as unavailable (in production, use date-based availability)
            room.setIsAvailable(false);
            roomRepository.save(room);
        }
        
        return getBookingByReference(bookingReference);
    }
    
    public List<BookingDTO> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public BookingDTO getBookingByReference(String reference) {
        Booking booking = bookingRepository.findByBookingReference(reference)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return convertToDTO(booking);
    }
    
    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return convertToDTO(booking);
    }
    
    private String generateBookingReference() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "BK" + timestamp + uuid;
    }
    
    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setUserName(booking.getUser().getFullName());
        dto.setUserEmail(booking.getUser().getEmail());
        dto.setUserPhone(booking.getUser().getPhone());
        dto.setHotelId(booking.getHotel().getId());
        dto.setHotelName(booking.getHotel().getHotelName());
        dto.setHotelAddress(booking.getHotel().getAddress());
        dto.setHotelCity(booking.getHotel().getCity());
        dto.setHotelContact(booking.getHotel().getContactNumber());
        dto.setBookingReference(booking.getBookingReference());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setTotalNights(booking.getTotalNights());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setBookingStatus(booking.getBookingStatus());
        dto.setPaymentStatus(booking.getPaymentStatus());
        dto.setBookingDate(booking.getBookingDate());
        dto.setSpecialRequests(booking.getSpecialRequests());
        
        // Convert booking rooms
        List<BookedRoomDTO> roomDTOs = booking.getBookingRooms().stream()
                .map(br -> new BookedRoomDTO(
                    br.getRoom().getId(),
                    br.getRoom().getRoomNumber(),
                    br.getRoom().getRoomType(),
                    br.getRoom().getBedType(),
                    br.getRoomPrice()
                ))
                .collect(Collectors.toList());
        dto.setRooms(roomDTOs);
        
        return dto;
    }
}