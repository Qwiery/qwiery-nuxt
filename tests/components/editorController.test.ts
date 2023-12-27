import { describe, test, it, expect, vi } from "vitest";
import { Utils } from "@orbifold/utils";
import EditorController from "../pages/apps/generic/editor/editorController";
import GraphAPI from "../utils/GraphAPI";

describe("EditorController", () => {
	it("should raise events", async () => {
		const c = new EditorController();
		c.commitChanges = true;
		vi.mock("../utils/GraphAPI");
		const api = vi.mocked(GraphAPI);
		const node = { id: "a", name: "a" };
		const r = vi.fn().mockName("nodeDeletedHandler");
		c.on("nodePropertiesUpdated", r);
		await c.updateNode(node);
		expect(r).toHaveBeenCalledOnce();
		expect(api.updateNode).toHaveBeenCalledOnce();
		r.mockReset();
		await expect(c.updateNode({ id: "" })).rejects.toThrow(Error);
		expect(r).not.toHaveBeenCalled();
	});
});
