package com.hotelbooking.repository;

import com.hotelbooking.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByLocationContainingIgnoreCase(String location);
    List<Hotel> findByCityContainingIgnoreCase(String city);
    
    @Query("SELECT DISTINCT h FROM Hotel h WHERE " +
           "LOWER(h.location) LIKE LOWER(CONCAT('%', :location, '%')) OR " +
           "LOWER(h.city) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<Hotel> findByLocationOrCity(@Param("location") String location);
}