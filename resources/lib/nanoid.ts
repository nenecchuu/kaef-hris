import { customAlphabet } from "nanoid";

const NANOID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const NANOID_LENGTH = 12;

export const nanoid = customAlphabet(NANOID_ALPHABET, NANOID_LENGTH);
