import * as React from 'react';
import { useParams } from 'react-router-dom';

const Words: React.FC = () => {
    const { name }: { name: string } = useParams();
    console.log(name);
    console.log(useParams());

    return <main>{name}</main>;
};

export default Words;
