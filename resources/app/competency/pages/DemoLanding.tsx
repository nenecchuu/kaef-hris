import * as React from "react";
import { IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@src/ui/button";

export function DemoLanding() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-kf-blue to-kf-blue-dark">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-kf-blue">
            <IconUsers size={40} className="text-gray-100" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-100">
            Aplikasi Manajemen Kompetensi
          </h1>
          <p className="text-sm text-gray-600">Kimia Farma - Demo MVP</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/leader/home")}
            className="w-full rounded-lg bg-kf-blue px-6 py-4 text-left text-gray-100 shadow-md transition hover:bg-kf-blue-dark"
          >
            <div className="flex items-center justify-between text-gray-100">
              <div>
                <div className="font-semibold text-gray-100">
                  Demo sebagai Leader
                </div>
                <div className="text-sm text-gray-100 opacity-90">
                  Lina Sari - Direktur Keuangan
                </div>
              </div>
              <IconUsers size={24} className="text-gray-100" />
            </div>
          </Button>

          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-4 text-center">
            <div className="text-sm font-medium text-gray-500">
              Demo sebagai Karyawan
            </div>
            <div className="text-xs text-gray-400">(Coming Soon)</div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-kf-orange/10 p-4">
          <div className="text-xs font-semibold text-kf-orange">
            📝 Note untuk Demo:
          </div>
          <ul className="mt-2 space-y-1 text-xs text-gray-600">
            <li>• Fokus: Leaders Persona (Organizational View)</li>
            <li>• Data: 1 Leader dengan 7 anggota tim</li>
            <li>• Flow: Home → Tim → Detail Assessment</li>
          </ul>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Demo MVP v1.0 | Generated with Claude Code
        </div>
      </div>
    </div>
  );
}
