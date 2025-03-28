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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("title")}
                id="title"
                name="title"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="companyName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("companyName")}
                id="companyName"
                name="companyName"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.companyName && <p>{errors.companyName.message}</p>}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="industry"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("industry")}
                id="industry"
                name="industry"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.industry && <p>{errors.industry.message}</p>}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="problemStatement"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("problemStatement")}
                id="problemStatement"
                name="problemStatement"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.problemStatement && (
              <p>{errors.problemStatement.message}</p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="solution"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("solution")}
                id="solution"
                name="solution"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.solution && <p>{errors.solution.message}</p>}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="businessModel"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("businessModel")}
                id="businessModel"
                name="businessModel"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.businessModel && <p>{errors.businessModel.message}</p>}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="financials"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("financials")}
                id="financials"
                name="financials"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.financials && <p>{errors.financials.message}</p>}
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="teamInfo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                {...register("teamInfo")}
                id="teamInfo"
                name="teamInfo"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.teamInfo && <p>{errors.teamInfo.message}</p>}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button disabled={!isValid} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateDeckForm;
