import { applyDecorators } from "@nestjs/common";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export function IsNotEmptyString() {
  return applyDecorators(IsNotEmpty(), IsString());
}

export function IsNotEmptyNumber() {
  return applyDecorators(IsNotEmpty(), IsNumber());
}

export function IsNotEmptyDate() {
  return applyDecorators(IsNotEmpty(), IsDate());
}

export function IsNotEmptyBoolean() {
  return applyDecorators(IsNotEmpty(), IsBoolean());
}
