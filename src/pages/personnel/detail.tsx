import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import FormHeader from "../../components/shared/form-header";
import ResponsiveButton from "../../components/shared/responsive-button";
import Link from "next/link";
import ConfirmationAlert from "../../components/shared/confirm-alert";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  MechanicPersonnel,
  selectPersonnel,
  updatePersonnel,
} from "../../features/personnel/personnelSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  USER_ROLES,
  User,
  selectRegistered,
  updateUser,
} from "../../features/auth/authSlice";
import { DateUtils } from "../../utils/date.utils";
import CredentialsModal from "../../components/personnel/credentialsModal/modal";
import RedAlert from "../../components/shared/red-alert";
import { AuthorizationUtils } from "../../utils/authorization.utils";

const PersonnelDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  //   const imageUrl = faker.image.avatar();
  const fetched_personnel = useAppSelector(selectPersonnel);
  const fetched_registered = useAppSelector(selectRegistered);

  const { workerId } = router.query;

  console.log("Query  vehicleId: ", workerId);
  const isEditing = workerId !== null && workerId !== undefined;
  console.log("Is editing: ", isEditing);

  const imageUrl = "https://avatars.githubusercontent.com/u/92688547";

  const findWorkerById = (collection: any[], id: string) => {
    // Implementa la lógica para buscar el vehículo por su ID en el estado
    return collection.find((el: any) => el.id === id) || null;
  };

  const findElementByEmail = (collection: any[], email: string) => {
    return collection.find((el: any) => el.email === email) || null;
  };

  const [worker, setWorkerState] = useState({
    id: "",
    rut: "",
    fullName: "",
    email: "",
    birthdate: "",
    specialty: "",
    address: "",
    phone: "",
    isActive: true,
    createdAt: "",
  });

  const [authUser, setAuthUser] = useState<User>({
    id: "",
    email: "",
    password: "",
    name: "",
    role: "",
    token: "",
    createdAt: "",
    isEnabled: true,
    lastLogin: "",
  });

  const [showConfirmationModal, setShowOrderUpdateModal] =
    React.useState(false);

  const [showSuccessCredentialsModal, setShowSuccessCredentialsModal] =
    React.useState(false);

  const [modalConfig, setModalConfig] = useState({
    message: "",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    onConfirm: () => {},
    onClose: () => {},
  });

  const [showCredentialsModal, setShowCredentialsModal] = React.useState(false);

  const showCredentialsModalHandler = () => setShowCredentialsModal(true);
  const hideCredentialsModalHandler = () => setShowCredentialsModal(false);

  //NOTE: Will only be executed at the time of initial
  //rendering and it will not be executed on component
  //re-rendering.

  useEffect(() => {
    console.log("CreateVehicle useEffect");

    AuthorizationUtils.useRoleGuard([USER_ROLES.ADMIN], router);

    if (workerId?.length && isEditing) {
      const foundWorker = findWorkerById(fetched_personnel, workerId as string);
      console.log("Found vehicle: ", foundWorker);

      if (foundWorker) {
        setWorkerState(foundWorker);

        const foundAuthUser = findElementByEmail(
          fetched_registered,
          foundWorker.email
        );

        console.log("Found auth user: ", foundAuthUser);

        if (foundAuthUser) {
          setAuthUser(foundAuthUser);
        }

        // console.log("Setting vehicle state: ", foundWorker);
      }
    }
  }, [workerId, fetched_personnel /*fetched_registered*/]);

  const onChangeWorkerStatus = () => {
    const deactivationMessage =
      "¿Está seguro que desea desactivar el trabajador?";
    const activationMessage = "¿Está seguro que desea activar el trabajador?";
    const message = worker.isActive ? deactivationMessage : activationMessage;

    setModalConfig({
      message,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      onConfirm: () => {
        updateWorkerStatus();
        updateAuthUserStatus();
        setShowOrderUpdateModal(false);
      },
      onClose: () => {
        setShowOrderUpdateModal(false);
      },
    });
    setShowOrderUpdateModal(true);
  };

  const updateAuthUserStatus = () => {
    const authChanges = {
      ...authUser,
      isEnabled: !authUser.isEnabled,
    };
    console.log("Auth changes: ", authChanges);
    setAuthUser(authChanges);
    dispatch(updateUser(authChanges));
  };

  const updateWorkerStatus = () => {
    const workerChanges = {
      ...worker,
      isActive: !worker.isActive,
    };
    setWorkerState(workerChanges);
    dispatch(updatePersonnel(workerChanges));
  };

  const onCloseShowCredentialsModal = () => {
    setShowCredentialsModal(false);
    setShowSuccessCredentialsModal(true);
  };

  return (
    <div>
      {showConfirmationModal && (
        <ConfirmationAlert
          icon={regular("question-circle")}
          message={modalConfig.message}
          onCancel={() => modalConfig.onClose()}
          onConfirm={() => modalConfig.onConfirm()}
          confirmButtonText={modalConfig.confirmButtonText}
          cancelButtonText={modalConfig.cancelButtonText}
        ></ConfirmationAlert>
      )}

      {}

      {showCredentialsModal && (
        <CredentialsModal
          onClose={onCloseShowCredentialsModal}
          currentUser={authUser}
        ></CredentialsModal>
      )}

      {showSuccessCredentialsModal && (
        <RedAlert
          message="Credenciales actualizadas correctamente"
          onClose={() => setShowSuccessCredentialsModal(false)}
        ></RedAlert>
      )}

      <div className="flex items-center justify-center py-4 md:py-2">
        <div className="md:px-6 px-6">
          <header>
            <FormHeader
              id="header-personnel"
              text="Detalle de personal de trabajo"
              includeRoute={true}
            ></FormHeader>
          </header>
          <div className="bg-white shadow rounded p-4">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="md:w-1/3 w-3/4 md:mr-4 mr-0 md:mb-0 mb-6 md:ml-6 ml-0">
                <img
                  src={imageUrl}
                  alt="Imagen de perfil"
                  className="w-full h-auto rounded-full mb-4 md:mb-0"
                />
              </div>
              <div className="flex flex-col md:w-2/3 md:pl-4 gap-y-2 md:ml-4 ml-0">
                <h2 className="text-2xl font-bold mb-4">
                  Ficha del trabajador
                </h2>
                <div>
                  <p className="text-gray-600">Nombre completo:</p>
                  <p className="text-lg font-medium">{worker.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha de nacimiento:</p>
                  <p className="text-lg font-medium">{"05/04/2016"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Especialidad:</p>
                  <p className="text-lg font-medium">{worker.specialty}</p>
                </div>
                <div>
                  <p className="text-gray-600">Correo:</p>
                  <p className="text-lg font-medium">{worker.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Contacto:</p>
                  <p className="text-lg font-medium">{worker.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Dirección:</p>
                  <p className="text-lg font-medium">{worker.address}</p>
                </div>

                <div>
                  <p className="text-gray-600">Última conexión:</p>
                  <p className="text-lg font-medium">
                    {authUser?.lastLogin
                      ? DateUtils.formatISOStringWithTime(authUser.lastLogin)
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600">Estado:</p>
                  <p
                    className={`text-lg font-medium ${
                      worker.isActive ? "text-green-500" : "text-rose-500"
                    }`}
                  >
                    {worker.isActive ? "Activo" : "Inactivo"}
                  </p>
                </div>

                <div className="flex flex-row w-full mt-6 gap-x-3">
                  {worker.isActive && (
                    <Link href={`/personnel/create?workerId=${worker.id}`}>
                      <ResponsiveButton
                        textSm="Editar"
                        text="Editar"
                        theme="warning"
                      ></ResponsiveButton>
                    </Link>
                  )}
                  {worker.isActive && (
                    // <Link href={`/personnel/create?workerId=${worker.id}`}>
                    <ResponsiveButton
                      textSm="Credenciales"
                      text="Actualizar credenciales"
                      theme="warning"
                      onClick={() => showCredentialsModalHandler()}
                    ></ResponsiveButton>
                    // </Link>
                  )}
                  <ResponsiveButton
                    textSm={worker.isActive ? "Desactivar" : "Activar"}
                    text={worker.isActive ? "Desactivar" : "Activar"}
                    theme={worker.isActive ? "danger" : "success"}
                    onClick={() => onChangeWorkerStatus()}
                  ></ResponsiveButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonnelDetail;
