import { NextRouter } from "next/router";
import { getUserRole } from "../features/auth/tools";

export abstract class AuthorizationUtils {
  /**
   * Comprueba si el usuario está autenticado
   * desde el estado global de la aplicación.
   *
   * @param allowedRoles - Roles permitidos para acceder a la ruta
   * @param router - Router de Next.js
   * @param redirectionRoute - Ruta a la que se redirigirá al usuario si no tiene permisos
   */
  public static useRoleGuard = (
    allowedRoles: string[],
    router: NextRouter,
    redirectionRoute?: string
  ) => {
    const userRole = getUserRole();

    if (!userRole) {
      router.push("/signin"); // Redirigir a una página de acceso no autorizado si el usuario no tiene el rol permitido
    }

    if (!allowedRoles.includes(userRole)) {
      router.push(redirectionRoute || "/unauthorized"); // Redirigir a una página de acceso no autorizado si el usuario no tiene el rol permitido
    }
  };
}
