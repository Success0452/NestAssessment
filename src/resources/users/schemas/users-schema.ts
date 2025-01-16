import {SchemaObject} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import {UserRole} from "../types/user.enums";

export const GoogleUserSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'firstName', 'lastName', 'googleId'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@gmail.com'
        },
        firstName: {
            type: 'string',
            example: 'John'
        },
        lastName: {
            type: 'string',
            example: 'Doe'
        },
        googleId: {
            type: 'string',
            example: '112233445566778899'
        }
    }
};

export const GoogleSignInResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'User logged in successfully.'
        },
        data: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'johndoe@gmail.com'
                },
                firstName: {
                    type: 'string',
                    example: 'John'
                },
                lastName: {
                    type: 'string',
                    example: 'Doe'
                },
                googleId: {
                    type: 'string',
                    example: '112233445566778899'
                },
                role: {
                    type: 'string',
                    enum: ['HOUSE_SEEKER'],
                    example: 'HOUSE_SEEKER'
                },
                isGoogleAccount: {
                    type: 'boolean',
                    example: true
                },
                isEmailVerified: {
                    type: 'boolean',
                    example: true
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

export const CreateUserSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'password', 'firstName', 'lastName', 'phone'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@example.com'
        },
        password: {
            type: 'string',
            format: 'password',
            minLength: 8,
            example: 'password123'
        },
        firstName: {
            type: 'string',
            example: 'John'
        },
        lastName: {
            type: 'string',
            example: 'Doe'
        },
        phone: {
            type: 'string',
            example: '+1234567890'
        }
    }
};

export const CreateUserResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'User created successfully.'
        },
    }
};

export const LoginAccountSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'adedamolaijiwole@gmail.com'
        },
        password: {
            type: 'string',
            format: 'password',
            example: 'password123'
        }
    }
};

export const SendOtpResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'OTP sent successfully'
        },
    }
};

export const SendOtpSchema: SchemaObject = {
    type: 'object',
    required: ['email'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@example.com'
        }
    }
};

export const VerifyEmailSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'code'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@example.com'
        },
        code: {
            type: 'string',
            example: '1234'
        }
    }
};

export const VerifyEmailResponseSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'code'],
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'User Account Verified Successfully'
        },
    }
};

export const ChangePasswordSchema: SchemaObject = {
    type: 'object',
    required: ['currentPassword', 'newPassword'],
    properties: {
        currentPassword: {
            type: 'string',
            format: 'password',
            example: 'oldPassword123'
        },
        newPassword: {
            type: 'string',
            format: 'password',
            example: 'newPassword123'
        }
    }
};

export const ChangePasswordResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'Password changed successfully.'
        },
    }
};

export const UserResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'Operation successful'
        },
        data: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'johndoe@example.com'
                },
                firstName: {
                    type: 'string',
                    example: 'John'
                },
                lastName: {
                    type: 'string',
                    example: 'Doe'
                },
                phone: {
                    type: 'string',
                    example: '+1234567890'
                },
                role: {
                    type: 'string',
                    enum: ['HOUSE_SEEKER'],
                    example: 'HOUSE_SEEKER'
                },
                isEmailVerified: {
                    type: 'boolean',
                    example: false
                },
                isGoogleAccount: {
                    type: 'boolean',
                    example: false
                },
                isSuspended: {
                    type: 'boolean',
                    example: false
                },
                googleId: {
                    type: 'string',
                    example: '112233445566778899'
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

export const LoginResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'User logged in successfully.'
        },
        data: {
            type: 'object',
            properties: {
                token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'johndoe@example.com'
                },
                firstName: {
                    type: 'string',
                    example: 'John'
                },
                lastName: {
                    type: 'string',
                    example: 'Doe'
                },
                phone: {
                    type: 'string',
                    example: '+1234567890'
                },
                role: {
                    type: 'string',
                    enum: ['HOUSE_SEEKER'],
                    example: 'HOUSE_SEEKER'
                },
                isEmailVerified: {
                    type: 'boolean',
                    example: false
                },
                isGoogleAccount: {
                    type: 'boolean',
                    example: false
                },
                isSuspended: {
                    type: 'boolean',
                    example: false
                },
                googleId: {
                    type: 'string',
                    example: '112233445566778899'
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

export const UserListResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'User fetched successfully.'
        },
        data: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid',
                                example: '123e4567-e89b-12d3-a456-426614174000'
                            },
                            email: {
                                type: 'string',
                                format: 'email',
                                example: 'johndoe@example.com'
                            },
                            firstName: {
                                type: 'string',
                                example: 'John'
                            },
                            lastName: {
                                type: 'string',
                                example: 'Doe'
                            },
                            phone: {
                                type: 'string',
                                example: '+1234567890'
                            },
                            role: {
                                type: 'string',
                                enum: ['HOUSE_SEEKER'],
                                example: 'HOUSE_SEEKER'
                            },
                            isEmailVerified: {
                                type: 'boolean',
                                example: false
                            },
                            isGoogleAccount: {
                                type: 'boolean',
                                example: false
                            },
                            isSuspended: {
                                type: 'boolean',
                                example: false
                            },
                            googleId: {
                                type: 'string',
                                example: '112233445566778899'
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
                },
                total: {
                    type: 'number',
                    example: 100
                },
                page: {
                    type: 'number',
                    example: 1
                },
                limit: {
                    type: 'number',
                    example: 10
                }
            }
        }
    }
};

export const UpdateUserSchema: SchemaObject = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'johndoe@example.com'
        },
        password: {
            type: 'string',
            format: 'password',
            example: 'newPassword123'
        },
        firstName: {
            type: 'string',
            example: 'John'
        },
        lastName: {
            type: 'string',
            example: 'Doe'
        },
        phone: {
            type: 'string',
            example: '+1234567890'
        },
        profilePicture: {
            type: 'string',
            example: 'https://example.com/profile.jpg'
        },
        googleId: {
            type: 'string',
            example: '112233445566778899'
        },
        isGoogleAccount: {
            type: 'boolean',
            example: true
        }
    }
};

export const FindOneUserParamsSchema: SchemaObject = {
    type: 'object',
    required: ['id'],
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
        }
    }
};

export const UpdateUserResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'update success'
        }
    }
};

export const FindOneUserResponseSchema: SchemaObject = {
    type: 'object',
    properties: {
        statusCode: {
            type: 'number',
            example: 200
        },
        message: {
            type: 'string',
            example: 'User found successfully.'
        },
        data: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    example: 'johndoe@example.com'
                },
                firstName: {
                    type: 'string',
                    example: 'John'
                },
                lastName: {
                    type: 'string',
                    example: 'Doe'
                },
                phone: {
                    type: 'string',
                    example: '+1234567890'
                },
                profilePicture: {
                    type: 'string',
                    example: 'https://example.com/profile.jpg'
                },
                role: {
                    type: 'string',
                    enum: ['HOUSE_SEEKER'],
                    example: 'HOUSE_SEEKER'
                },
                isEmailVerified: {
                    type: 'boolean',
                    example: true
                },
                isGoogleAccount: {
                    type: 'boolean',
                    example: false
                },
                isSuspended: {
                    type: 'boolean',
                    example: false
                },
                googleId: {
                    type: 'string',
                    example: '112233445566778899'
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

export const FindAllUsersQuerySchema: SchemaObject = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            minimum: 1,
            default: 1,
            description: 'Page number for pagination',
            example: 1
        },
        limit: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10,
            description: 'Number of items per page',
            example: 10
        },
        role: {
            type: 'string',
            enum: ['HOUSE_SEEKER', 'ADMIN', 'LANDLORD'],
            description: 'Filter users by role',
            example: 'HOUSE_SEEKER'
        }
    }
};

export const UpdateUserRoleSchema : SchemaObject ={
    type: 'object',
    properties: {
        role: {
            type: 'string',
            enum: Object.values(UserRole),
            description: 'New role for the user'
        }
    }
}

export const UpdateUserRoleResponseSchema : SchemaObject = {
    type: 'object',
    properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' }
            }
        }
    }
}
