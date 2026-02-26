package com.hotelbooking.service;

import com.hotelbooking.dto.RoomDTO;
import com.hotelbooking.entity.Room;
import com.hotelbooking.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {
    
    private final RoomRepository roomRepository;
    
    public List<RoomDTO> getRoomsByHotelId(Long hotelId) {
        return roomRepository.findByHotelIdAndIsAvailable(hotelId, true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<RoomDTO> searchRooms(Long hotelId, String bedType,
            BigDecimal minPrice, BigDecimal maxPrice) {

BigDecimal finalMinPrice = (minPrice == null)
? BigDecimal.ZERO
: minPrice;

BigDecimal finalMaxPrice = (maxPrice == null)
? new BigDecimal("999999")
: maxPrice;

if (bedType != null && !bedType.isEmpty()) {

return roomRepository
.findAvailableRoomsByFilters(hotelId, bedType, finalMinPrice, finalMaxPrice)
.stream()
.map(this::convertToDTO)
.collect(Collectors.toList());

} else {

return roomRepository
.findByHotelIdAndIsAvailable(hotelId, true)
.stream()
.filter(room ->
   room.getPricePerNight().compareTo(finalMinPrice) >= 0 &&
   room.getPricePerNight().compareTo(finalMaxPrice) <= 0)
.map(this::convertToDTO)
.collect(Collectors.toList());
}
}
      
    
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return convertToDTO(room);
    }
    
    private RoomDTO convertToDTO(Room room) {
        return new RoomDTO(
            room.getId(),
            room.getHotel().getId(),
            room.getHotel().getHotelName(),
            room.getRoomNumber(),
            room.getRoomType(),
            room.getBedType(),
            room.getPricePerNight(),
            room.getMaxOccupancy(),
            room.getIsAvailable(),
            room.getAmenities(),
            room.getDescription(),
            room.getImageUrl()
        );
    }
}