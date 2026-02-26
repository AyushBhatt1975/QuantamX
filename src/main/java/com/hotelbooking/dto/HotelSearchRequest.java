package com.hotelbooking.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelSearchRequest {
    private String location;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String bedType;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}