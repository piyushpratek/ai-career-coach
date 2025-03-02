import { getAssessments } from '@/actions/interview';
import StatsCards, { QuestionType } from './_components/stats-cards';
import PerformanceChart from './_components/performace-chart';
import QuizList from './_components/quiz-list';

const InterviewPage = async () => {
    const assessments = await getAssessments();

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-6xl font-bold gradient-title">
                    Interview Preparation
                </h1>
            </div>
            <div className="space-y-6">
                {/* <StatsCards assessments={assessments} /> */}
                <StatsCards
                    assessments={assessments.map((assessment) => ({
                        ...assessment,
                        createdAt: assessment.createdAt.toISOString(), // Convert Date to string
                        updatedAt: assessment.updatedAt.toISOString(), // Convert Date to string
                        questions: (assessment.questions as QuestionType[]).map((q) => ({
                            question: q?.question || "",
                            userAnswer: q?.userAnswer || "",
                            answer: q?.answer || "",
                            isCorrect: q?.isCorrect ?? false,
                            explanation: q?.explanation || "",
                        })),
                    }))}
                />
                {/* <PerformanceChart assessments={assessments} /> */}
                <PerformanceChart
                    assessments={assessments.map((assessment) => ({
                        ...assessment,
                        createdAt: assessment.createdAt.toISOString(), // Convert Date to string if necessary
                        updatedAt: assessment.updatedAt.toISOString(), // Convert Date to string if necessary
                        questions: (assessment.questions as QuestionType[]).map((q) => ({
                            question: q?.question || "",
                            userAnswer: q?.userAnswer || "",
                            answer: q?.answer || "",
                            isCorrect: q?.isCorrect ?? false,
                            explanation: q?.explanation || "",
                        })),
                    }))}
                />

                {/* <QuizList assessments={assessments} /> */}
                <QuizList
                    assessments={assessments.map((assessment) => ({
                        ...assessment,
                        createdAt: assessment.createdAt.toISOString(), // Ensure Date to string conversion
                        updatedAt: assessment.updatedAt.toISOString(),
                        questions: (assessment.questions as QuestionType[]).map((q) => ({
                            question: q?.question || "",
                            userAnswer: q?.userAnswer || "",
                            answer: q?.answer || "",
                            isCorrect: q?.isCorrect ?? false,
                            explanation: q?.explanation || "",
                        })),
                    }))}
                />

            </div>
        </div>
    )
}

export default InterviewPage