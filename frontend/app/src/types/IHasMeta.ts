export interface IHasMeta {
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            total: number;
        };
    };
}

