/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, xml } from "@odoo/owl";

class MotivationPopup extends Component {
    static template = xml`
        <div class="o_motivation_popup_overlay" t-on-click="onOverlayClick">
            <div class="o_motivation_popup_box" t-on-click="(ev) => ev.stopPropagation()">
                <h3>✨ Daily Motivation</h3>
                <p class="o_motivation_quote_text" t-esc="state.text"/>
                <p class="o_motivation_quote_author" t-if="state.author">— <t t-esc="state.author"/></p>
                <div class="o_motivation_popup_actions">
                    <button class="btn btn-primary" t-on-click="onClose">Close</button>
                    <button class="btn btn-secondary" t-on-click="onDontShowAgain">Don't show again today</button>
                </div>
            </div>
        </div>
    `;

    setup() {
        this.state = useState({
            text: this.props.text,
            author: this.props.author,
        });
    }

    onOverlayClick() {
        this.props.close();
    }

    onClose() {
        this.props.close();
    }

    onDontShowAgain() {
        this.props.markShown();
        this.props.close();
    }
}

export const motivationPopupService = {
    dependencies: ["orm"],
    start(env, { orm }) {
        const showPopup = async () => {
            try {
                const shouldShow = await orm.call(
                    "res.users",
                    "check_show_motivation_popup",
                    []
                );
                if (!shouldShow) {
                    return;
                }
                const quote = await orm.call(
                    "motivation.quote",
                    "get_random_quote",
                    []
                );
                if (!quote) {
                    return;
                }

                const container = document.createElement("div");
                container.id = "o_motivation_popup_root";
                document.body.appendChild(container);

                const { mount } = await import("@odoo/owl");

                const close = () => {
                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                    }
                };
                const markShown = async () => {
                    await orm.call("res.users", "mark_motivation_popup_shown", []);
                };

                // Always mark as shown once displayed, so it appears only once per day
                await markShown();

                mount(MotivationPopup, container, {
                    env,
                    props: { text: quote.text, author: quote.author, close, markShown },
                });
            } catch (error) {
                console.warn("Daily Motivation Popup: could not load quote", error);
            }
        };

        // Delay slightly to let the web client finish loading
        setTimeout(showPopup, 1500);

        return {};
    },
};

registry.category("services").add("motivationPopupService", motivationPopupService);
