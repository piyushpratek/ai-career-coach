import { getCoverLetter } from '@/actions/cover-letter';
import React from 'react'
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CoverLetterPreview from '../_components/cover-letter-preview';

interface PageProps {
    params: {
        id: string;
    };
}

const EditCoverLetterPage = async ({ params }: PageProps) => {
    // const { id } = params
    const resolvedParams = params; // Ensure it's awaited
    console.log("Params Type:", typeof params, params);

    // console.log("Params:", resolvedParams);

    const coverLetter = await getCoverLetter(resolvedParams.id);

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col space-y-2">
                <Link href="/ai-cover-letter">
                    <Button variant="link" className="gap-2 pl-0">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Cover Letters
                    </Button>
                </Link>

                <h1 className="text-6xl font-bold gradient-title mb-6">
                    {coverLetter?.jobTitle} at {coverLetter?.companyName}
                </h1>
            </div>

            <CoverLetterPreview content={coverLetter?.content ?? ""} />
        </div>
    )
}

export default EditCoverLetterPage