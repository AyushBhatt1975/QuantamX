package com.hotelbooking.service;

import com.hotelbooking.dto.HotelDTO;
import com.hotelbooking.entity.Hotel;
import com.hotelbooking.entity.Room;
import com.hotelbooking.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class HotelService {
    
    private final HotelRepository hotelRepository;
    
    public List<HotelDTO> getAllHotels() {
        return hotelRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public HotelDTO getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        return convertToDTO(hotel);
    }
    
    public List<HotelDTO> searchHotels(String location) {
        return hotelRepository.findByLocationOrCity(location).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private HotelDTO convertToDTO(Hotel hotel) {
        HotelDTO dto = new HotelDTO();
        dto.setId(hotel.getId());
        dto.setHotelName(hotel.getHotelName());
        dto.setLocation(hotel.getLocation());
        dto.setAddress(hotel.getAddress());
        dto.setCity(hotel.getCity());
        dto.setState(hotel.getState());
        dto.setCountry(hotel.getCountry());
        dto.setPincode(hotel.getPincode());
        dto.setDescription(hotel.getDescription());
        dto.setAmenities(hotel.getAmenities());
        dto.setRating(hotel.getRating());
        dto.setImageUrl(hotel.getImageUrl());
        dto.setContactNumber(hotel.getContactNumber());
        dto.setEmail(hotel.getEmail());
        
        // Calculate available rooms count
        long availableCount = hotel.getRooms().stream()
                .filter(Room::getIsAvailable)
                .count();
        dto.setAvailableRoomsCount((int) availableCount);
        
        // Calculate min and max price
        if (!hotel.getRooms().isEmpty()) {
            BigDecimal minPrice = hotel.getRooms().stream()
                    .map(Room::getPricePerNight)
                    .min(Comparator.naturalOrder())
                    .orElse(BigDecimal.ZERO);
            
            BigDecimal maxPrice = hotel.getRooms().stream()
                    .map(Room::getPricePerNight)
                    .max(Comparator.naturalOrder())
                    .orElse(BigDecimal.ZERO);
            
            dto.setMinPrice(minPrice);
            dto.setMaxPrice(maxPrice);
        }
        
        return dto;
    }
}