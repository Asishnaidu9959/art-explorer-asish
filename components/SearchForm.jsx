
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function submit(data) {
    const params = new URLSearchParams();

    params.set("q", data.keyword.trim());

    if (data.titleOnly) {
      params.set("title", "true");
    }

    router.push(`/artwork?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>
        Keyword
        <input
          className="field"
          placeholder="Enter artwork keyword"
          {...register("keyword", {
            required: "Keyword required",
            validate: (value) =>
              value.trim().length >= 3 ||
              "Enter at least 3 characters"
          })}
        />
      </label>

      {errors.keyword && (
        <p className="error">{errors.keyword.message}</p>
      )}

      <p>
        <label>
          <input
            type="checkbox"
            {...register("titleOnly")}
          />
          {" "}Search in title only
        </label>
      </p>

      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}
