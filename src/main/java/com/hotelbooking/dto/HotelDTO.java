package com.hotelbooking.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {
    private Long id;
    private String hotelName;
    private String location;
    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String description;
    private String amenities;
    private BigDecimal rating;
    private String imageUrl;
    private String contactNumber;
    private String email;
    private Integer availableRoomsCount;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}