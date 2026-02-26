package com.hotelbooking.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long id;
    private Long hotelId;
    private String hotelName;
    private String roomNumber;
    private String roomType;
    private String bedType;
    private BigDecimal pricePerNight;
    private Integer maxOccupancy;
    private Boolean isAvailable;
    private String amenities;
    private String description;
    private String imageUrl;
}