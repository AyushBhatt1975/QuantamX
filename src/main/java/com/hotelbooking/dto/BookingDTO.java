package com.hotelbooking.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private Long hotelId;
    private String hotelName;
    private String hotelAddress;
    private String hotelCity;
    private String hotelContact;
    private String bookingReference;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer totalNights;
    private BigDecimal totalAmount;
    private String bookingStatus;
    private String paymentStatus;
    private LocalDateTime bookingDate;
    private String specialRequests;
    private List<BookedRoomDTO> rooms;
}