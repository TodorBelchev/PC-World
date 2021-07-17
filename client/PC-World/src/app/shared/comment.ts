export interface IComment {
    _id: string;
    body: {
        comment: string;
        rating: number;
        firstName: string;
        lastName: string;
    },
    modelId: string;
    createdAt: string;
}