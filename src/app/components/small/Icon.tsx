import React, { FC } from "react";

type Props = {
    src: string;
    className?: string;
    style?: object;
};

const Icon: FC<Props> = props => {
    return <img src={props.src} alt="" style={props.style} className={props.className} />;
};

export default Icon;
