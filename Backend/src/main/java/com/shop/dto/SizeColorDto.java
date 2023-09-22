package com.shop.dto;

import java.util.List;

import com.shop.entities.Color;
import com.shop.entities.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SizeColorDto {
	private List<Size> size;
	private List<Color> color;
}
