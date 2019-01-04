/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

export const TITLE_HEIGHT = 38;

export const EMOJI_HEIGHT = 36;
export const EMOJI_PER_ROW = 9;

export const STICKER_HEIGHT = 108;
export const STICKER_PER_ROW = 3;

export function calculateCategoryHeight(
  count: number,
  itemHeight: number,
  itemPerRow: number,
): number {
  return Math.ceil(count / itemPerRow) * itemHeight;
}

export function calculateEmojiCategoryHeight(count: number): number {
  return calculateCategoryHeight(count, EMOJI_HEIGHT, EMOJI_PER_ROW);
}

export function calculateStickerCategoryHeight(count: number): number {
  return calculateCategoryHeight(count, STICKER_HEIGHT, STICKER_PER_ROW);
}

export function calculateEmojiCategoryWidth(): number {
  return EMOJI_HEIGHT * EMOJI_PER_ROW + 22;
}

export function calculateStickerCategoryWidth(): number {
  return (STICKER_HEIGHT + 4) * STICKER_PER_ROW + 22;
}
