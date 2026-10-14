/**
 * Extracts a human-readable error message from backend error responses,
 * including 403 Forbidden messages from verified agent checks.
 */
export function extractApiErrorMessage(error: any, fallback = 'Operation failed. Please try again.'): string {
    if (!error) return fallback;

    // Field-level validation errors
    const fieldErrors = error?.data?.errors;
    if (fieldErrors && typeof fieldErrors === 'object') {
        const messages: string[] = [];
        for (const field of Object.keys(fieldErrors)) {
            const fieldMessages = fieldErrors[field];
            if (Array.isArray(fieldMessages)) {
                messages.push(...fieldMessages);
            } else if (typeof fieldMessages === 'string') {
                messages.push(fieldMessages);
            }
        }
        if (messages.length > 0) {
            return messages.join(' • ');
        }
    }

    // Top-level backend message
    const data = error?.data;
    if (typeof data === 'string' && data.trim()) return data;
    if (data?.message && typeof data.message === 'string' && data.message.trim()) {
        return data.message;
    }
    if (data?.error && typeof data.error === 'string' && data.error.trim()) {
        return data.error;
    }
    if (data?.response?.message && typeof data.response.message === 'string' && data.response.message.trim()) {
        return data.response.message;
    }
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
        return data.errors.filter(Boolean).join(', ');
    }

    // Fallbacks
    if (error?.message && typeof error.message === 'string' && error.message.trim()) {
        return error.message;
    }
    if (error?.error && typeof error.error === 'string' && error.error.trim()) {
        return error.error;
    }

    return fallback;
}
