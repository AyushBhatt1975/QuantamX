package com.hotelbooking.controller;

import com.hotelbooking.dto.RoomDTO;
import com.hotelbooking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
<<<<<<< HEAD
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

=======
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class RoomController {
    
    private final RoomService roomService;
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<RoomDTO>> getRoomsByHotelId(@PathVariable Long hotelId) {
        return ResponseEntity.ok(roomService.getRoomsByHotelId(hotelId));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/search")
    public ResponseEntity<List<RoomDTO>> searchRooms(
            @RequestParam Long hotelId,
            @RequestParam(required = false) String bedType,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        return ResponseEntity.ok(roomService.searchRooms(hotelId, bedType, minPrice, maxPrice));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }
}