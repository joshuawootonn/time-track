/********************************************************************************
** Form generated from reading UI file 'employeeeditform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_EMPLOYEEEDITFORM_H
#define UI_EMPLOYEEEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>

QT_BEGIN_NAMESPACE

class Ui_EmployeeEditForm
{
public:
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QLineEdit *name;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_2;
    QLineEdit *pin;
    QPushButton *GenerateButton;
    QGridLayout *gridLayout;
    QCheckBox *current;
    QCheckBox *admin;
    QCheckBox *active;
    QLabel *error;
    QHBoxLayout *horizontalLayout_4;
    QSpacerItem *horizontalSpacer;
    QPushButton *FinishButton;
    QPushButton *CancelButton;

    void setupUi(QDialog *EmployeeEditForm)
    {
        if (EmployeeEditForm->objectName().isEmpty())
            EmployeeEditForm->setObjectName(QStringLiteral("EmployeeEditForm"));
        EmployeeEditForm->resize(246, 203);
        EmployeeEditForm->setStyleSheet(QLatin1String("QWidget#ClockoutForm{\n"
"\n"
"background-color:#E5EAE7;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 16px;\n"
"color:#263544;\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E5EAE7;\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#F4F9F6;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#F4F9F6;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#F4F9F6;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
""
                        "\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
""));
        verticalLayout = new QVBoxLayout(EmployeeEditForm);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label = new QLabel(EmployeeEditForm);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout->addWidget(label);

        name = new QLineEdit(EmployeeEditForm);
        name->setObjectName(QStringLiteral("name"));

        horizontalLayout->addWidget(name);


        verticalLayout->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label_2 = new QLabel(EmployeeEditForm);
        label_2->setObjectName(QStringLiteral("label_2"));

        horizontalLayout_2->addWidget(label_2);

        pin = new QLineEdit(EmployeeEditForm);
        pin->setObjectName(QStringLiteral("pin"));
        pin->setMaxLength(4);

        horizontalLayout_2->addWidget(pin);

        GenerateButton = new QPushButton(EmployeeEditForm);
        GenerateButton->setObjectName(QStringLiteral("GenerateButton"));

        horizontalLayout_2->addWidget(GenerateButton);


        verticalLayout->addLayout(horizontalLayout_2);

        gridLayout = new QGridLayout();
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        current = new QCheckBox(EmployeeEditForm);
        current->setObjectName(QStringLiteral("current"));

        gridLayout->addWidget(current, 2, 0, 1, 1);

        admin = new QCheckBox(EmployeeEditForm);
        admin->setObjectName(QStringLiteral("admin"));

        gridLayout->addWidget(admin, 0, 0, 1, 1);

        active = new QCheckBox(EmployeeEditForm);
        active->setObjectName(QStringLiteral("active"));

        gridLayout->addWidget(active, 1, 0, 1, 1);


        verticalLayout->addLayout(gridLayout);

        error = new QLabel(EmployeeEditForm);
        error->setObjectName(QStringLiteral("error"));

        verticalLayout->addWidget(error);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_4->addItem(horizontalSpacer);

        FinishButton = new QPushButton(EmployeeEditForm);
        FinishButton->setObjectName(QStringLiteral("FinishButton"));

        horizontalLayout_4->addWidget(FinishButton);

        CancelButton = new QPushButton(EmployeeEditForm);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));

        horizontalLayout_4->addWidget(CancelButton);


        verticalLayout->addLayout(horizontalLayout_4);


        retranslateUi(EmployeeEditForm);

        QMetaObject::connectSlotsByName(EmployeeEditForm);
    } // setupUi

    void retranslateUi(QDialog *EmployeeEditForm)
    {
        EmployeeEditForm->setWindowTitle(QApplication::translate("EmployeeEditForm", "Dialog", Q_NULLPTR));
        label->setText(QApplication::translate("EmployeeEditForm", "Name:", Q_NULLPTR));
        label_2->setText(QApplication::translate("EmployeeEditForm", "Pin:", Q_NULLPTR));
        GenerateButton->setText(QApplication::translate("EmployeeEditForm", "Generate", Q_NULLPTR));
        current->setText(QApplication::translate("EmployeeEditForm", "Employed", Q_NULLPTR));
        admin->setText(QApplication::translate("EmployeeEditForm", "Admin", Q_NULLPTR));
        active->setText(QApplication::translate("EmployeeEditForm", "Clocked In", Q_NULLPTR));
        error->setText(QString());
        FinishButton->setText(QApplication::translate("EmployeeEditForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("EmployeeEditForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class EmployeeEditForm: public Ui_EmployeeEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_EMPLOYEEEDITFORM_H
