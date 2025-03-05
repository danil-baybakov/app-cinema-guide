import { z } from 'zod';

export const SuccessResponseSchema = z.object({
	success: z.literal(true)
});

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>

export const ResultResponseSchema = z.object({
	result: z.boolean()
});

export type ResultResponse = z.infer<typeof ResultResponseSchema>

export const ErrorResponseSchema = z.object({
	error: z.string()
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>




