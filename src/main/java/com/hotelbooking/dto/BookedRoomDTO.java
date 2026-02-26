package com.hotelbooking.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookedRoomDTO {
    private Long roomId;
    private String roomNumber;
    private String roomType;
    private String bedType;
    private BigDecimal roomPrice;
}