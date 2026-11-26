import { gql } from "@apollo/client";

const CREATE_COMMENT = gql`
    mutation CreateComment(
        $postId: ID!,
        $userId: ID!,
        $content: String!
    ) {
        createComment(
            postId: $postId,
            userId: $userId,
            content: $content
        ) {
            id
        }
    }
`;

export default {
    CREATE_COMMENT,
};