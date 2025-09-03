import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, MemoryStick } from 'lucide-react';

export default function ProcessTable({ processes }) {
  const getStateColor = (state) => {
    const colors = {
      running: 'bg-green-100 text-green-800 border-green-200',
      ready: 'bg-blue-100 text-blue-800 border-blue-200',
      blocked: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      terminated: 'bg-gray-100 text-gray-800 border-gray-200',
      zombie: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[state] || colors.ready;
  };

  const getPriorityColor = (priority) => {
    if (priority >= 8) return 'bg-red-500';
    if (priority >= 6) return 'bg-orange-500';
    if (priority >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Process Table
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {processes.map((process) => (
              <motion.div
                key={process.pid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-mono text-gray-500">PID</span>
                    <span className="font-bold text-lg">{process.pid}</span>
                  </div>
                  <div>
                    <div className="font-medium">{process.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStateColor(process.state)}>
                        {process.state}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <div 
                          className={`w-2 h-2 rounded-full ${getPriorityColor(process.priority)}`}
                        />
                        Priority {process.priority}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{process.remaining_time || 0}ms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MemoryStick className="w-4 h-4" />
                    <span>{process.memory_size || 0}KB</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {processes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No processes running</p>
              <p className="text-sm">Create a process using: create &lt;name&gt;</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}