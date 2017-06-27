/********************************************************************************
** Form generated from reading UI file 'connectionform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CONNECTIONFORM_H
#define UI_CONNECTIONFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QPushButton>

QT_BEGIN_NAMESPACE

class Ui_ConnectionForm
{
public:
    QGridLayout *gridLayout;
    QPushButton *connect;
    QLineEdit *edit;
    QCheckBox *save;
    QLabel *label;
    QProgressBar *progress;

    void setupUi(QDialog *ConnectionForm)
    {
        if (ConnectionForm->objectName().isEmpty())
            ConnectionForm->setObjectName(QStringLiteral("ConnectionForm"));
        ConnectionForm->resize(447, 192);
        ConnectionForm->setStyleSheet(QLatin1String("QWidget#ConnectionForm{\n"
"\n"
"background-color:#E7EBE9;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 19px;\n"
"color:#263544;\n"
"\n"
"}\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QPushButton:hover,QPushButton:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"QLineEdit{ \n"
"background-color:#F1F4F5;\n"
"border: 0px solid 263544; \n"
"\n"
"}\n"
"QLineEdit:hover{ \n"
"background-color:#F1F4F5;\n"
"border: 1px solid 263544; \n"
"}\n"
"\n"
"\n"
""));
        gridLayout = new QGridLayout(ConnectionForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        connect = new QPushButton(ConnectionForm);
        connect->setObjectName(QStringLiteral("connect"));

        gridLayout->addWidget(connect, 1, 3, 1, 1);

        edit = new QLineEdit(ConnectionForm);
        edit->setObjectName(QStringLiteral("edit"));

        gridLayout->addWidget(edit, 1, 1, 1, 1);

        save = new QCheckBox(ConnectionForm);
        save->setObjectName(QStringLiteral("save"));
        save->setChecked(true);

        gridLayout->addWidget(save, 1, 4, 1, 1);

        label = new QLabel(ConnectionForm);
        label->setObjectName(QStringLiteral("label"));

        gridLayout->addWidget(label, 0, 1, 1, 4);

        progress = new QProgressBar(ConnectionForm);
        progress->setObjectName(QStringLiteral("progress"));
        progress->setValue(0);
        progress->setOrientation(Qt::Horizontal);
        progress->setInvertedAppearance(false);

        gridLayout->addWidget(progress, 5, 0, 1, 5);


        retranslateUi(ConnectionForm);

        QMetaObject::connectSlotsByName(ConnectionForm);
    } // setupUi

    void retranslateUi(QDialog *ConnectionForm)
    {
        ConnectionForm->setWindowTitle(QApplication::translate("ConnectionForm", "Time Track", Q_NULLPTR));
        connect->setText(QApplication::translate("ConnectionForm", "Connect", Q_NULLPTR));
        save->setText(QString());
        label->setText(QApplication::translate("ConnectionForm", "Please enter the ip you want to connect to above.\n"
"Shop ip: 192.168.0.10 \n"
"Office ip: 192.168.41.187", Q_NULLPTR));
        progress->setFormat(QString());
    } // retranslateUi

};

namespace Ui {
    class ConnectionForm: public Ui_ConnectionForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CONNECTIONFORM_H
