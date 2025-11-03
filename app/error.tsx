'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Alert } from 'components/ui/alert';
import { Button } from 'components/ui/button';
import { ButtonGroup } from '@chakra-ui/react';

export default function ErrorMessage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    const loginAndRetryButtons = (
        <ButtonGroup>
            <Button onClick={() => reset() /* Attempt to recover by trying to re-render the segment */}>
                Try reloading
            </Button>
        </ButtonGroup>
    );

    const message = error?.message;
    return (
        <Alert status="error" title="Error! While trying to load data:" endElement={loginAndRetryButtons}>
            {message && <span>{message}</span>}
            {!message && (
                <span>
                    Details:
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </span>
            )}
        </Alert>
    );
}
