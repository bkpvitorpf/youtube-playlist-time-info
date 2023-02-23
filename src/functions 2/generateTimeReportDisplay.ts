export const generateTimeReportDisplay = (): Element => {
    const htmlElement = `
    <div
    style="
      display: flex;
      font-family: 'Roboto';
      font-size: 16px;
      flex-direction: column;
      margin-top: 1.5rem;
    "
    class="style-scope ytd-text-inline-expander"
    id="playlist-time-info"
  >
    <div style="display: flex; justify-content: space-between; width: 100%">
      <button
        style="
          padding: 8px;
          background: transparent;
          background-color: #4b5563;
          border: none;
          border-radius: 2px;
          cursor: pointer;
        "
        id="playlist-time-info-generate-report-button"
      >
        Generate Time Report
      </button>

      <button
        style="
          padding: 8px;
          background-color: #4b5563;
          border: none;
          border-radius: 2px;
          cursor: pointer;
        "
        id="playlist-time-info-update-report-button"
      >
        <img src="" />
      </button>
    </div>

    <div
      style="display: flex; flex-direction: column; margin-top: 1.5rem"
      id="playlist-time-info-report"
      hidden="false"
    >
      <div
        id="playlist-time-info-time-spans"
        style="display: flex; flex-direction: column"
      >
        <span id="timeSpan">Time</span>
        <span id="watchedTimeSpan">b</span>
        <span id="unwatchedTimeSpan">c</span>
      </div>

      <div style="display: flex; flex-direction: column; margin-top: 0.5rem">
        <div>
          <p>
            Select one of the options below to modify the time report (the
            changes will also be applied to the time displayed in the video
            tumbnails)
          </p>
        </div>
        <div
          id="playlist-time-info-time-options-buttons"
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
          "
        >
          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="025"
          >
            0.25
          </button>

          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="05"
          >
            0.5
          </button>

          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="075"
          >
            0.75
          </button>

          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="1"
          >
            1
          </button>

          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="125"
          >
            1.25
          </button>

          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="15"
          >
            1.5
          </button>

          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="175"
          >
            1.75
          </button>

          <button
            style="
              padding: 8px;
              background-color: #4b5563;
              border: none;
              border-radius: 2px;
              cursor: pointer;
            "
            id="2"
          >
            2
          </button>
        </div>
      </div>
    </div>
  </div>
  `
    const timeReportDisplayElement = document.createElement('div')
    timeReportDisplayElement.innerHTML = htmlElement.trim()

    return timeReportDisplayElement
}