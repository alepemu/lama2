import React, { FC } from 'react';

type GridProps = {
    columns: number;
};

const Grid: FC<GridProps> = ({ children, columns }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 20,
                // maxWidth: '800px',
                // margin: '100px auto',
                padding: '20px',
            }}
        >
            {children}
        </div>
    );
};

export default Grid;
