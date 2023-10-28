import Swal from "sweetalert2";

/**
 * Gateway to notifications.
 */
export class Notifications {
	/**
	 * Shows an error toast.
	 * @param msg {string} The error message.
	 */
	static error(msg: string) {
		return Swal.fire({
			title: "Error!",
			text: "Do you want to continue",
			icon: "error",
			confirmButtonText: "Cool",
		});
	}
}

/**
 * Gateway to toasts.
 */
export class Toasts {
	static error(msg: string) {
		return Swal.fire({
			toast: true,
			title: "Error",
			position: "top",
			text: msg,
			icon: "error",
			showCloseButton: false,
			showConfirmButton: false,
			background: "#ad1c1c",
			timer: 2000,
		});
	}
}
