import {User} from "../entities/user.entity";
import {UserResponseDto} from "../dto/outbound/user_response.dto";

export const generateRandomNumber = (length: number = 6): number => {
    return Math.floor(Math.random() * Math.pow(10, length));
};

export function checkIfUserExists(currentUser: User | null){
    if (!currentUser){
        return UserResponseDto.mapToUserNotFound()
    }
    return null;
}
