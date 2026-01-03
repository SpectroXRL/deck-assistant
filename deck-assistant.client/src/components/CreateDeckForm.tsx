import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(3),
  companyName: z.string().min(3),
  industry: z.string().min(3),
  problemStatement: z.string().min(3),
  solution: z.string().min(3),
  businessModel: z.string().min(3),
  financials: z.string().min(3),
  teamInfo: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
}

const CreateDeckForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-black text-white px-6 py-4">
        <h1 className="text-2xl font-semibold">Create Deck</h1>
      </nav>

      {/* Form Container */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Deck Title
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Enter a memorable name for your pitch deck
              </p>
              <input
                {...register("title")}
                id="title"
                name="title"
                type="text"
                className="block w-full md:w-2/3 rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="e.g., TechStartup Series A Pitch"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Company Name Field */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Company Name
              </label>
              <p className="text-sm text-gray-600 mb-2">
                The official name of your company
              </p>
              <input
                {...register("companyName")}
                id="companyName"
                name="companyName"
                type="text"
                className="block w-full md:w-1/2 rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="e.g., Acme Corporation"
              />
              {errors.companyName && (
                <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            {/* Industry Field */}
            <div>
              <label
                htmlFor="industry"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Industry
              </label>
              <p className="text-sm text-gray-600 mb-2">
                The sector or market your company operates in
              </p>
              <input
                {...register("industry")}
                id="industry"
                name="industry"
                type="text"
                className="block w-full md:w-1/2 rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="e.g., FinTech, Healthcare, E-commerce"
              />
              {errors.industry && (
                <p className="text-red-600 text-sm mt-1">{errors.industry.message}</p>
              )}
            </div>

            {/* Problem Statement Field */}
            <div>
              <label
                htmlFor="problemStatement"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Problem Statement
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Describe the key problem or pain point your company addresses
              </p>
              <textarea
                {...register("problemStatement")}
                id="problemStatement"
                name="problemStatement"
                rows={3}
                className="block w-full rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="Describe the problem your target customers face..."
              />
              {errors.problemStatement && (
                <p className="text-red-600 text-sm mt-1">{errors.problemStatement.message}</p>
              )}
            </div>

            {/* Solution Field */}
            <div>
              <label
                htmlFor="solution"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Solution
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Explain how your product or service solves the problem
              </p>
              <textarea
                {...register("solution")}
                id="solution"
                name="solution"
                rows={3}
                className="block w-full rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="Describe your solution and its key benefits..."
              />
              {errors.solution && (
                <p className="text-red-600 text-sm mt-1">{errors.solution.message}</p>
              )}
            </div>

            {/* Business Model Field */}
            <div>
              <label
                htmlFor="businessModel"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Business Model
              </label>
              <p className="text-sm text-gray-600 mb-2">
                How your company generates revenue
              </p>
              <textarea
                {...register("businessModel")}
                id="businessModel"
                name="businessModel"
                rows={2}
                className="block w-full rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="e.g., SaaS subscription, marketplace fees, B2B licensing..."
              />
              {errors.businessModel && (
                <p className="text-red-600 text-sm mt-1">{errors.businessModel.message}</p>
              )}
            </div>

            {/* Financials Field */}
            <div>
              <label
                htmlFor="financials"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Financials
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Key financial metrics, projections, or current traction
              </p>
              <textarea
                {...register("financials")}
                id="financials"
                name="financials"
                rows={2}
                className="block w-full rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="e.g., $500K ARR, 150% YoY growth, break-even in 2027..."
              />
              {errors.financials && (
                <p className="text-red-600 text-sm mt-1">{errors.financials.message}</p>
              )}
            </div>

            {/* Team Info Field */}
            <div>
              <label
                htmlFor="teamInfo"
                className="block text-base font-semibold text-gray-900 mb-1"
              >
                Team Information
              </label>
              <p className="text-sm text-gray-600 mb-2">
                Highlight key team members and their relevant experience
              </p>
              <textarea
                {...register("teamInfo")}
                id="teamInfo"
                name="teamInfo"
                rows={2}
                className="block w-full rounded-md bg-white px-4 py-2.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                placeholder="e.g., CEO: 10 years in fintech, CTO: ex-Google engineer..."
              />
              {errors.teamInfo && (
                <p className="text-red-600 text-sm mt-1">{errors.teamInfo.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex items-center justify-start">
            <button
              disabled={!isValid}
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDeckForm;
