import React from 'react'
import { redirect } from 'next/navigation'
import { getUserOnboardingStatus } from '@/actions/user'

const OnboardingPage = async () => {
    //Check if user is already onboarded
    const { isOnboarded } = await getUserOnboardingStatus()

    if (isOnboarded) {
        redirect("/dashboard")
    }
    return (
        <main>OnboardingPage</main>
    )
}

export default OnboardingPage