import Swal from "sweetalert2";
import { fa } from "@faker-js/faker";
export class Notifications {
	static error(msg: string) {
		Swal.fire({
			title: "Error!",
			text: "Do you want to continue",
			icon: "error",
			confirmButtonText: "Cool",
		});
	}
}
export class Toasts {
	static error(msg: string) {
		Swal.fire({
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
