package com.hotelbooking.controller;

import com.hotelbooking.dto.BookingDTO;
import com.hotelbooking.dto.BookingRequest;
import com.hotelbooking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
<<<<<<< HEAD
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

=======
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class BookingController {
    
    private final BookingService bookingService;
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookingService.createBooking(request));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getUserBookings(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/reference/{reference}")
    public ResponseEntity<BookingDTO> getBookingByReference(@PathVariable String reference) {
        return ResponseEntity.ok(bookingService.getBookingByReference(reference));
    }
<<<<<<< HEAD

=======
    
>>>>>>> 0edf5a3147206eb51160c763231d7b7e01f2346e
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }
}