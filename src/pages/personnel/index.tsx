import FormHeader from "../../components/shared/form-header";

function Personnel() {
  return (
    <div className="px-4">
      <header>
        <FormHeader
          id="header-vehiculos"
          text="Personal de trabajo"
          includeRoute={false}
        ></FormHeader>
      </header>

      <h3 className="mt-4 text-center">En construcción...</h3>
    </div>
  );
}

export default Personnel;
