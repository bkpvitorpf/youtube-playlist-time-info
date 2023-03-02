import React, { StrictMode } from 'react';
import { TimeReport } from "./TimeReport";

export const CreateReactApp = () => {
    return React.createElement('div', { id: 'playlist-time-info-report-display' }, <>
        <StrictMode>
            <TimeReport />
        </StrictMode>
    </>)
}