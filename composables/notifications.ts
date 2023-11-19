import Swal from "sweetalert2";
import { tr } from "@faker-js/faker";

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

	static info(msg: string) {
		return Swal.fire({
			title: "Info",
			text: msg,
			icon: "info",
			// confirmButtonText: "Cool",
		});
	}

	static async askForPropertyName() {
		const inputValue: string = "";
		const { value: propName } = await Swal.fire({
			title: "New Property",
			input: "text",
			inputLabel: "Name of the new property",
			inputValue,
			showCancelButton: true,
			inputValidator: (v) => {
				if (Utils.isPropertyName(v)) {
					return "You need to supply a valid property name.";
				}
			},
		});

		return propName;
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

	static info(msg: string) {
		return Swal.fire({
			toast: true,
			title: "Info",
			position: "top",
			text: msg,
			icon: "info",
			showCloseButton: false,
			showConfirmButton: false,
			background: "#565656",
			timer: 3000,
		});
	}

	static confirm(msg: string) {
		return Swal.fire({
			toast: true,
			title: "Confirmation",
			position: "center",
			text: msg,
			icon: "question",
			showCloseButton: false,
			showConfirmButton: true,
			showDenyButton: true,
			background: "#565656",
			confirmButtonText: "Yes",
			denyButtonText: "No",
			allowEnterKey: true,
			allowEscapeKey: true,
			denyButtonColor: "silver",
			confirmButtonColor: "green",
		});
	}
}
