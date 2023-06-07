import FormHeader from "../../components/shared/form-header";

function Orders() {
  return (
    <div>
      <header>
        <FormHeader
          id="header-vehiculos"
          text="Clientes"
          includeRoute={false}
        ></FormHeader>
      </header>

      <h3 className="mt-4 text-center">En construcción...</h3>
    </div>
  );
}

export default Orders;
