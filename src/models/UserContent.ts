import { Schema } from 'mongoose';

export interface UserContentProps {
   profilePicture?: string;
   bio?: string;
   instagram?: string;
   x?: string;
   tiktok?: string;
   youtube?: string;
   facebook?: string;
}

export type SimplifiedUserContentProps = {
   profilePicture?: string;
   bio?: string;
   instagram?: string;
   x?: string;
   tiktok?: string;
   youtube?: string;
   facebook?: string;
};

export const userContentSchema = new Schema<UserContentProps>({
   profilePicture: { type: String, default: null },
   bio: { type: String, default: null },
   instagram: { type: String, default: null },
   x: { type: String, default: null },
   tiktok: { type: String, default: null },
   youtube: { type: String, default: null },
   facebook: { type: String, default: null },
});
