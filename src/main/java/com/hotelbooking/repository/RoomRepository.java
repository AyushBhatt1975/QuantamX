package com.hotelbooking.repository;

import com.hotelbooking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotelId(Long hotelId);
    List<Room> findByHotelIdAndBedType(Long hotelId, String bedType);
    List<Room> findByHotelIdAndIsAvailable(Long hotelId, Boolean isAvailable);
    
    @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId AND " +
           "r.bedType = :bedType AND r.isAvailable = true AND " +
           "r.pricePerNight BETWEEN :minPrice AND :maxPrice")
    List<Room> findAvailableRoomsByFilters(
        @Param("hotelId") Long hotelId,
        @Param("bedType") String bedType,
        @Param("minPrice") BigDecimal minPrice,
        @Param("maxPrice") BigDecimal maxPrice
    );
}