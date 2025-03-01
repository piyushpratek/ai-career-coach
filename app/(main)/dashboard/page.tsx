import { getIndustryInsights } from "@/actions/dashboard"
import { getUserOnboardingStatus } from "@/actions/user"
import { redirect } from "next/navigation"
import DashboardView, { SalaryRange } from "./_components/dashboard-view"


const IndustryInsightsPage = async () => {
    const { isOnboarded } = await getUserOnboardingStatus()

    if (!isOnboarded) {
        redirect("/onboarding")
    }

    // const insights = await getIndustryInsights();
    const rawInsights = await getIndustryInsights();

    const insights = {
        ...rawInsights,
        salaryRanges: Array.isArray(rawInsights.salaryRanges)
            ? rawInsights.salaryRanges.filter((range): range is SalaryRange =>
                range !== null &&
                typeof range === "object" &&
                "role" in range &&
                "min" in range &&
                "max" in range &&
                "median" in range
            )
            : [],
        lastUpdated: rawInsights.lastUpdated instanceof Date ? rawInsights.lastUpdated.toISOString() : rawInsights.lastUpdated,
        nextUpdate: rawInsights.nextUpdate instanceof Date ? rawInsights.nextUpdate.toISOString() : rawInsights.nextUpdate
    };


    return (
        <div className="container mx-auto">
            <DashboardView insights={insights} />
        </div>
    )
}

export default IndustryInsightsPage