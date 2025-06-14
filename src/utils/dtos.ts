
export interface CreateArticleDto {
    title: string;
    description:  string;
}

export interface UpdateArticleDto {
    title?: string;
    description?:  string;
}

export interface RegisterUserDto {
    username: string;
    email:  string;
    password:  string;
}

export interface LoginUserDto {
    email:  string;
    password:  string;
}
export interface UpdateUserDto {
    username?:  string;
    email?:  string;
    password?:  string;
}

export interface CreateCommentDto {
    text: string;
    ArticleId?:  number;
}

export interface UpDateCommentDto {
    text: string;
}