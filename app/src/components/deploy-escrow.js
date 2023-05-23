import { ethers } from "ethers";
import { useRef } from "react";

export default function DeployEscrow({ onDeployEscrowContract }) {
  const formRef = useRef(null);

  const onDeployEscrow = async (event) => {
    try {
      event.preventDefault();
      const form = new FormData(event.target);
      const beneficiary = form.get("beneficiary");
      const arbiter = form.get("arbiter");
      const amount = ethers.utils.parseEther(form.get("amount"));
      await onDeployEscrowContract({
        amount,
        beneficiary,
        arbiter,
      });
      formRef.current.reset();
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="w-full max-w-xl m-auto">
      <h2 className="text-xl mb-5"> Create New Escrow Contract </h2>
      <form onSubmit={onDeployEscrow} ref={formRef}>
        <div className="space-y-3 rounded-md shadow-sm">
          <div>
            <label htmlFor="arbiter" className="sr-only">
              Arbiter Address
            </label>
            <input
              id="arbiter"
              name="arbiter"
              type="text"
              autoComplete="off"
              required
              className="relative block w-full rounded-md border-0 py-3 px-2 text-gray-900 ring-1 ring-inset placeholder:text-gray-900 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 outline-0"
              placeholder="Arbiter Address"
            />
          </div>

          <div>
            <label htmlFor="beneficiary" className="sr-only">
              Beneficiary Address
            </label>
            <input
              id="beneficiary"
              name="beneficiary"
              type="text"
              autoComplete="off"
              required
              className="relative block w-full rounded-md border-0 py-3 px-2 text-gray-900 ring-1 ring-inset placeholder:text-gray-900 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 outline-0"
              placeholder="Beneficiary Address"
            />
          </div>

          <div>
            <label htmlFor="amount" className="sr-only">
              Deposit Amount (in ETH)
            </label>
            <input
              id="amount"
              name="amount"
              min="0"
              type="number"
              autoComplete="off"
              required
              className="relative block w-full rounded-md border-0 py-3 px-2 text-gray-900 ring-1 ring-inset placeholder:text-gray-900 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 outline-0"
              placeholder="Deposit Amount (in ETH)"
            />
          </div>
        </div>

        <button type="submit" className="button"></button>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-gray-900 transition-all py-2 px-3 text-lg text-white hover:bg-gray-800"
          >
            Deploy
          </button>
        </div>
      </form>
    </div>
  );
}
