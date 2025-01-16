import {SchemaObject} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const CreatePropertyListingSchema: SchemaObject = {
    type: "object",
    required: [
        "title", "description", "type", "details", "pricing", "availability", "date_listed"
    ],
    properties: {
        title: { type: "string", example: "Beautiful Apartment" },
        description: { type: "string", example: "Spacious 2-bedroom apartment in a great location." },
        type: {
            type: "string",
            enum: ["apartment", "house", "shared"],
            example: "apartment"
        },
        details: {
            type: "object",
            properties: {
                bedrooms: { type: "number", example: 2 },
                bathrooms: { type: "number", example: 1 },
                features: {
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["car space", "fence", "gate", "others"],
                        example: "car space"
                    }
                },
                squareFootage: { type: "number", example: 850 }
            },
            required: ["bedrooms", "bathrooms", "features", "squareFootage"]
        },
        pricing: {
            type: "object",
            properties: {
                rent: { type: "number", example: 1500 },
                securityDeposit: { type: "number", example: 1500 },
                otherFees: {
                    type: "object",
                    additionalProperties: { type: "number" },
                    example: { cleaning: 100 }
                }
            },
            required: ["rent", "securityDeposit", "otherFees"]
        },
        availability: {
            type: "object",
            properties: {
                moveOutDate: { type: "string", format: "date-time", example: "2024-12-01T00:00:00.000Z" },
                minimumLease: { type: "number", example: 6 },
                maximumLease: { type: "number", example: 12 }
            },
            required: ["moveOutDate", "minimumLease", "maximumLease"]
        },
        date_listed: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T00:00:00.000Z"
        }
    }
};

export const CreatePropertyListResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 201
        },
        message: {
            type: 'string',
            example: 'Property listing created successfully'
        },
        data: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                },
                ownerId: {
                    type: 'string',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                },
                title: {
                    type: 'string',
                    example: 'Beautiful Apartment'
                },
                house_type: {
                    type: 'string',
                    example: 'Four bedroom flat'
                },
                house_details: {
                    type: 'string',
                    example: 'Charming 4-bedroom house with a spacious living area and a large backyard, located in a quiet neighborhood.'
                },
                number_of_rooms: {
                    type: 'integer',
                    example: 4
                },
                number_of_toilets: {
                    type: 'integer',
                    example: 3
                },
                number_of_bathrooms: {
                    type: 'integer',
                    example: 3
                },
                other_features: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: ['car space', 'fence', 'gate', 'others']
                    },
                    example: ['car space', 'fence']
                },
                house_address: {
                    type: 'string',
                    example: '49, Oregon Canada'
                },
                price: {
                    type: 'number',
                    example: 400000
                },
                availability: {
                    type: "object",
                    properties: {
                        moveOutDate: {type: "string", format: "date-time", example: "2024-12-01T00:00:00.000Z"},
                        minimumLease: {type: "number", example: 6},
                        maximumLease: {type: "number", example: 12}
                    },
                },
                media: {
                    type: "object",
                    properties: {
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "uri",
                                example: "https://example.com/property-image1.jpg"
                            }
                        },
                        videos: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "uri",
                                example: "https://example.com/property-video1.mp4"
                            }
                        }
                    },
                },
                virtualTourUrl: {
                    type: 'string',
                    format: 'uri',
                    example: 'https://example.com/virtual-tour',
                    description: 'URL to a virtual tour of the property'
                },
                date_listed: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-01-01T00:00:00.000Z'
                },
                status: {
                    type: 'string',
                    enum: ['AVAILABLE', 'RENTED', 'SOLD'],
                    example: 'AVAILABLE'
                },
                aiMatchScore: {
                    type: 'number',
                    format: 'float',
                    example: 75.5,
                    description: 'AI-generated match score for property relevance'
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-01-01T00:00:00.000Z'
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-01-01T00:00:00.000Z'
                }
            }
        }
    }
};

export const UpdatePropertyListingSchema: SchemaObject = {
    type: "object",
    properties: {
        house_type: {
            type: 'string',
            example: 'Updated Two bedroom flat',
        },
        house_details: {
            type: 'string',
            example: 'Updated cozy 2-bedroom flat in a vibrant neighborhood.',
        },
        price: {
            type: 'number',
            example: 500000,
        },
        availability: {
            type: 'object',
            properties: {
                isAvailable: { type: 'boolean', example: true },
                moveOutDate: { type: 'string', format: 'date', example: '2024-12-31' },
                minimumLease: {type: "number", example: 6},
                maximumLease: {type: "number", example: 12}
            }
        },
        other_features: {
            type: 'array',
            items: {
                type: 'string',
                enum: ['car space', 'fence', 'gate', 'others'],
                example: ['car space', 'fence'],
            },
        },
        media: {
            type: "object",
            properties: {
                images: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "uri",
                        example: "https://example.com/property-image1.jpg"
                    }
                },
                videos: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "uri",
                        example: "https://example.com/property-video1.mp4"
                    }
                }
            },
        },
        virtualTourUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://example.com/virtual-tour-url',
        },
    },
};

export const UpdatePropertyListingResponseSchema: SchemaObject = {
    type: "object",
    properties: {
        id: {
            type: 'string',
            example: '12345',
        },
        house_type: {
            type: 'string',
            example: 'Updated Four bedroom flat',
        },
        house_details: {
            type: 'string',
            example: 'Updated Charming 4-bedroom house with a spacious living area and a large backyard, located in a quiet neighborhood.',
        },
        price: {
            type: 'number',
            example: 400000,
        },
        availability: {
            type: 'object',
            properties: {
                isAvailable: { type: 'boolean', example: true },
                moveOutDate: { type: 'string', format: 'date', example: '2024-12-31' }
            }
        },
        other_features: {
            type: 'array',
            items: {
                type: 'string',
                enum: ['car space', 'fence', 'gate', 'others'],
                example: ['car space', 'fence'],
            },
        },
        media: {
            type: "object",
            properties: {
                images: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "uri",
                        example: "https://example.com/property-image1.jpg"
                    }
                },
                videos: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "uri",
                        example: "https://example.com/property-video1.mp4"
                    }
                }
            },
        },
        virtualTourUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://example.com/virtual-tour-url',
        },
        createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-11-07T12:34:56Z',
        },
        updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-11-07T12:45:00Z',
        },
    },
};

export const DeletePropertyResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'Property deleted successfully.'
        }
    }
};

export const FindPropertyResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'Properties retrieved successfully.'
        },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '12345'
                    },
                    title: {
                        type: 'string',
                        example: 'Beautiful Apartment'
                    },
                    description: {
                        type: 'string',
                        example: 'Spacious 2-bedroom apartment in a great location.'
                    },
                    type: {
                        type: 'string',
                        example: 'apartment'
                    },
                    details: {
                        type: 'object',
                        properties: {
                            bedrooms: {
                                type: 'number',
                                example: 2
                            },
                            bathrooms: {
                                type: 'number',
                                example: 1
                            },
                            features: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    example: 'car space'
                                }
                            },
                            squareFootage: {
                                type: 'number',
                                example: 850
                            }
                        }
                    },
                    pricing: {
                        type: 'object',
                        properties: {
                            rent: {
                                type: 'number',
                                example: 1500
                            },
                            securityDeposit: {
                                type: 'number',
                                example: 1500
                            },
                            otherFees: {
                                type: 'object',
                                properties: {
                                    cleaning: {
                                        type: 'number',
                                        example: 100
                                    }
                                }
                            }
                        }
                    },
                    availability: {
                        type: 'object',
                        properties: {
                            moveOutDate: {
                                type: 'string',
                                format: 'date-time',
                                example: '2024-12-01T00:00:00.000Z'
                            },
                            minimumLease: {
                                type: 'number',
                                example: 6
                            },
                            maximumLease: {
                                type: 'number',
                                example: 12
                            }
                        }
                    },
                    media: {
                        type: "object",
                        properties: {
                            images: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "uri",
                                    example: "https://example.com/property-image1.jpg"
                                }
                            },
                            videos: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "uri",
                                    example: "https://example.com/property-video1.mp4"
                                }
                            }
                        },
                    },
                    date_listed: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-01T00:00:00.000Z'
                    }
                }
            }
        }
    }
};

export const FindAllPropertiesResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'Properties retrieved successfully.'
        },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '12345'
                    },
                    title: {
                        type: 'string',
                        example: 'Beautiful Apartment'
                    },
                    description: {
                        type: 'string',
                        example: 'Spacious 2-bedroom apartment in a great location.'
                    },
                    type: {
                        type: 'string',
                        example: 'apartment'
                    },
                    details: {
                        type: 'object',
                        properties: {
                            bedrooms: {
                                type: 'number',
                                example: 2
                            },
                            bathrooms: {
                                type: 'number',
                                example: 1
                            },
                            features: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    example: 'car space'
                                }
                            },
                            squareFootage: {
                                type: 'number',
                                example: 850
                            }
                        }
                    },
                    pricing: {
                        type: 'object',
                        properties: {
                            rent: {
                                type: 'number',
                                example: 1500
                            },
                            securityDeposit: {
                                type: 'number',
                                example: 1500
                            },
                            otherFees: {
                                type: 'object',
                                properties: {
                                    cleaning: {
                                        type: 'number',
                                        example: 100
                                    }
                                }
                            }
                        }
                    },
                    availability: {
                        type: 'object',
                        properties: {
                            moveOutDate: {
                                type: 'string',
                                format: 'date-time',
                                example: '2024-12-01T00:00:00.000Z'
                            },
                            minimumLease: {
                                type: 'number',
                                example: 6
                            },
                            maximumLease: {
                                type: 'number',
                                example: 12
                            }
                        }
                    },
                    media: {
                        type: "object",
                        properties: {
                            images: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "uri",
                                    example: "https://example.com/property-image1.jpg"
                                }
                            },
                            videos: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "uri",
                                    example: "https://example.com/property-video1.mp4"
                                }
                            }
                        },
                    },
                    date_listed: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-01T00:00:00.000Z'
                    }
                }
            }
        }
    }
};

export const FindPropertiesByStatusResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'Properties with status available retrieved successfully.'
        },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '12345'
                    },
                    title: {
                        type: 'string',
                        example: 'Beautiful Apartment'
                    },
                    description: {
                        type: 'string',
                        example: 'Spacious 2-bedroom apartment in a great location.'
                    },
                    type: {
                        type: 'string',
                        example: 'apartment'
                    },
                    details: {
                        type: 'object',
                        properties: {
                            bedrooms: {
                                type: 'number',
                                example: 2
                            },
                            bathrooms: {
                                type: 'number',
                                example: 1
                            },
                            features: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    example: 'car space'
                                },
                                example: ['car space']
                            },
                            squareFootage: {
                                type: 'number',
                                example: 850
                            }
                        }
                    },
                    pricing: {
                        type: 'object',
                        properties: {
                            rent: {
                                type: 'number',
                                example: 1500
                            },
                            securityDeposit: {
                                type: 'number',
                                example: 1500
                            },
                            otherFees: {
                                type: 'object',
                                properties: {
                                    cleaning: {
                                        type: 'number',
                                        example: 100
                                    }
                                }
                            }
                        }
                    },
                    availability: {
                        type: 'object',
                        properties: {
                            moveOutDate: {
                                type: 'string',
                                format: 'date',
                                example: '2024-12-01T00:00:00.000Z'
                            },
                            minimumLease: {
                                type: 'number',
                                example: 6
                            },
                            maximumLease: {
                                type: 'number',
                                example: 12
                            }
                        }
                    },
                    media: {
                        type: "object",
                        properties: {
                            images: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "uri",
                                    example: "https://example.com/property-image1.jpg"
                                }
                            },
                            videos: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "uri",
                                    example: "https://example.com/property-video1.mp4"
                                }
                            }
                        },
                    },
                    date_listed: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-01-01T00:00:00.000Z'
                    }
                }
            }
        }
    }
};

// export const RecommendPropertiesSchema: SchemaObject = {
//     type: 'object',
//     properties: {
//         targetPropertyId: {
//             type: 'string',
//             example: 'target12345'
//         }
//     }
// };

export const RecommendPropertiesResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'Recommended properties based on your preferences.'
        },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '12345'
                    },
                    house_type: {
                        type: 'string',
                        example: 'Four bedroom flat'
                    },
                    house_details: {
                        type: 'string',
                        example: 'Charming 4-bedroom house with a spacious living area.'
                    },
                    house_address: {
                        type: 'string',
                        example: '49, Oregon Canada'
                    },
                    price: {
                        type: 'string',
                        example: '#400,000'
                    },
                    owner: {
                        type: 'string',
                        example: 'user12345'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2024-11-07T12:34:56Z'
                    },
                    rentDifference: {
                        type: 'number',
                        example: 500
                    },
                    securityDepositDifference: {
                        type: 'number',
                        example: 100
                    },
                    otherFeesDifference: {
                        type: 'number',
                        example: 50
                    },
                    bedroomsDifference: {
                        type: 'number',
                        example: 1
                    },
                    bathroomsDifference: {
                        type: 'number',
                        example: 1
                    },
                    squareFootageDifference: {
                        type: 'number',
                        example: 100
                    },
                    featureMatchCount: {
                        type: 'number',
                        example: 3
                    }
                }
            }
        }
    }
};


