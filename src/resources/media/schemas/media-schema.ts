import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const CreateMediaSchema: SchemaObject = {
    type: "object",
    required: [ "format", "type", "propertyId"],
    properties: {
        file: {
            type: "string",
            format: 'binary',
        },
        format: {
            type: "string",
            enum: ["jpg", "png", "mp4", "webm"],
            example: "jpg",
            description: "File format of the media.",
        },
        type: {
            type: "string",
            enum: ["image", "video", "document"],
            example: "image",
            description: "Type of media.",
        },
        propertyId: {
            type: "string",
            example: "123e4567-e89b-12d3-a456-426614174000",
            description: "Associated property ID for the media file.",
        },
    },
};


export const CreateMediaResponseSchema: SchemaObject = {
    type: "object",
    properties: {
        statusCode: {
            type: "number",
            example: 201
        },
        message: {
            type: "string",
            example: "Media created successfully."
        },
        data: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "123e4567-e89b-12d3-a456-426614174000"
                },
                url: {
                    type: "string",
                    format: "uri",
                    example: "https://example.com/media-image.jpg"
                },
                format: {
                    type: "string",
                    example: "jpg"
                },
                type: {
                    type: "string",
                    example: "image"
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-11-14T10:15:30.000Z"
                },
                updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-11-14T10:15:30.000Z"
                }
            }
        }
    }
};

export const DeleteMediaResponseSchema: SchemaObject = {
    type: "object",
    properties: {
        statusCode: {
            type: "number",
            example: 200
        },
        message: {
            type: "string",
            example: "Media deleted successfully."
        }
    }
};

export const FindMediaResponseSchema: SchemaObject = {
    type: "object",
    properties: {
        statusCode: {
            type: "number",
            example: 200
        },
        message: {
            type: "string",
            example: "Media retrieved successfully."
        },
        data: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "123e4567-e89b-12d3-a456-426614174000"
                },
                url: {
                    type: "string",
                    format: "uri",
                    example: "https://example.com/media-image.jpg"
                },
                format: {
                    type: "string",
                    example: "jpg"
                },
                type: {
                    type: "string",
                    example: "image"
                },
                propertyId: {
                    type: "string",
                    example: "123e4567-e89b-12d3-a456-426614174000"
                },
                createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-11-14T10:15:30.000Z"
                },
                updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2024-11-14T10:15:30.000Z"
                }
            }
        }
    }
};

export const FindAllMediaResponseSchema: SchemaObject = {
    type: "object",
    properties: {
        statusCode: {
            type: "number",
            example: 200
        },
        message: {
            type: "string",
            example: "Media list retrieved successfully."
        },
        data: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "123e4567-e89b-12d3-a456-426614174000"
                    },
                    url: {
                        type: "string",
                        format: "uri",
                        example: "https://example.com/media-image.jpg"
                    },
                    title: {
                        type: "string",
                        example: "Living Room View"
                    },
                    description: {
                        type: "string",
                        example: "A beautiful view of the living room."
                    },
                    format: {
                        type: "string",
                        example: "jpg"
                    },
                    type: {
                        type: "string",
                        example: "image"
                    },
                    propertyId: {
                        type: "string",
                        example: "123e4567-e89b-12d3-a456-426614174000"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-14T10:15:30.000Z"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-11-14T10:15:30.000Z"
                    }
                }
            }
        }
    }
};
