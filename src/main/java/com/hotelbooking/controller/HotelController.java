package com.hotelbooking.controller;

import com.hotelbooking.dto.HotelDTO;
import com.hotelbooking.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
<<<<<<< HEAD
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

=======
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class HotelController {
    
    private final HotelService hotelService;
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping
    public ResponseEntity<List<HotelDTO>> getAllHotels() {
        return ResponseEntity.ok(hotelService.getAllHotels());
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/{id}")
    public ResponseEntity<HotelDTO> getHotelById(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.getHotelById(id));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/search")
    public ResponseEntity<List<HotelDTO>> searchHotels(@RequestParam String location) {
        return ResponseEntity.ok(hotelService.searchHotels(location));
    }
}